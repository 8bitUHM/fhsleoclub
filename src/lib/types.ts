type Member = {
  email: string;
  name: string;
  role: string;
};

type ClubEvent = {
  description: string,
  end_time: string,
  location: string,
  start_time: string,
  title: string,
  date: number,
}

const Roles:Record<string, number> = {
  "president": 1,
  "vice president": 2,
  "secretary": 3,
  "treasurer": 4,
  "public relations": 5,
}

export type { Member, ClubEvent };
export { Roles };
