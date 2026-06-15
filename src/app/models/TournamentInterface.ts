export interface Tournament {
  id: number;

  team1Id: number;
  team2Id: number;

  team1Name: string;
  team2Name: string;

  location: string;

  matchDateTime: string;
}
