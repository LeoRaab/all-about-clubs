import localforage from "localforage";
import _, { orderBy } from "lodash";
import { sortBy } from "lodash";
import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { string } from "yup";
import * as config from "../config";
import { APIError } from "../errors/APIError";
import { API, STATUS_CODE_UNAUTHORIZED } from "../network/API";

export interface IClub {
    id: number;
    name: string;
    country: string;
    value: number;
    image: string;
    european_titles: number;
}

class Clubs {
    clubs: IClub[] | null = null;
    sortedBy: keyof IClub = "name";
    sortingMode: "asc" | "desc" = "asc";
    error: APIError | null = null;
    isLoading = false;
    globalLegalUpdatedAt: string | null = null;
    isRehydrated = false;

    constructor() {
        makeAutoObservable(this);
        this.initPersistence();
    }

    initPersistence = async () => {
        try {
            await makePersistable(this, {
                name: "clubs",
                properties: ["clubs"],
                storage: localforage,
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.isRehydrated = true;
            });
        }
    };

    loadClubs = async () => {
        this.isLoading = true;

        try {
            const clubs = await API.loadClubs();

            runInAction(() => {
                this.error = null;
                this.clubs = clubs;
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            });

            if (error instanceof APIError) {
                this.wipe(error);
            }
        }
    };

    changeSorting(sortedBy: keyof IClub, sortingMode: "asc" | "desc" = "asc") {
        this.sortedBy = sortedBy;
        this.sortingMode = sortingMode;
    }

    get sortedClubs(): IClub[] {
        return _.orderBy(this.clubs?.slice(), this.sortedBy, this.sortingMode);
    }

    get sorting() {
        return this.sortedBy;
    }

    private wipe(error: APIError | null) {
        this.error = error;
        this.isLoading = false;
        this.clubs = null;
    }
}

let clubsStore: Clubs;
if (process.env.NODE_ENV === "test") {
    class MockClubs {
        clubs: any = null;
        error: any = null;
        isRehydrated = true;

        constructor() {
            makeAutoObservable(this);
        }

        loadClubs = () => undefined;
    }

    clubsStore = new MockClubs() as any; // no localstorage support in node env
} else {
    clubsStore = new Clubs();
}

// development, make auth available on window object...
(window as any).clubs = clubsStore;

// singleton, exposes an instance by default
export { clubsStore };
