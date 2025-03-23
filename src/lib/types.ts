type Member = {
  email: string;
  name: string;
  role: string;
};

type Events = {
  description: string,
  end_time: string,
  location: string,
  start_time: string,
  title: string,
}

export type { Member, Events };