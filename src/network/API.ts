import * as Config from "../config";
import { APIError } from "../errors/APIError";
import { IClub } from "../stores/ClubsStore";

export const API = {
    async loadClubs(): Promise<IClub[]> {
        try {
            const response = await fetch(`${Config.API_BASE_URL}/hiring/clubs.json`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new APIError(response.status, response.statusText);
            }

            return response.json();
        } catch (error) {
            throw error;
        }
    },
};
