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

export type { Member, ClubEvent };