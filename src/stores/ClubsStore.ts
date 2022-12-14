import localforage from "localforage";
import _ from "lodash";
import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { APIError } from "../errors/APIError";
import { API } from "../network/API";

export interface IClub {
    id: string;
    name: string;
    country: string;
    value: number;
    image: string;
    european_titles: number;
}

class Clubs {
    clubsCollection: IClub[] | null = null;
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
                properties: ["clubsCollection"],
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
                this.clubsCollection = clubs;
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

    get sortedClubs(): IClub[] {
        return _.orderBy(this.clubsCollection?.slice(), this.sortedBy, this.sortingMode);
    }

    getClubById(clubId: string): IClub | undefined {
        return this.clubsCollection?.find((club) => club.id === clubId);
    }

    getClubByArrayId(clubArrayId: number): IClub | undefined {
        return this.clubsCollection?.slice()[clubArrayId];
    }

    changeSorting(sortedBy: keyof IClub, sortingMode: "asc" | "desc" = "asc") {
        this.sortedBy = sortedBy;
        this.sortingMode = sortingMode;
    }

    private wipe(error: APIError | null) {
        this.error = error;
        this.isLoading = false;
        this.clubsCollection = null;
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
