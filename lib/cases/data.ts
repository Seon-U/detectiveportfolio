export type Case = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  status: "ONGOING" | "SOLVED" | "HOLDED";
  date: string;
  image: string;
  description: string;
};

export const ALLCASES: Case[] = [
	{
		id: "001",
		title: "Project Chimera",
		summary: "A complex web platform with heavily tangled state logic.",
    tags: ["React", "State Management", "Redux"],
    status: "SOLVED",
		date: "1994-10-24",
		image:
			"https://images.unsplash.com/photo-1633520833019-e34afd4b8fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBjbGFzc2lmaWVkJTIwZm9sZGVyfGVufDF8fHx8MTc3OTUzNTExM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A complex web platform with heavily tangled state logic causing memory leaks."
    },
	{
		id: "002",
		title: "The Silent API",
		summary:
			"Investigating the disappearance of crucial data points in a high-traffic app.",
		tags: ["Next.js", "API", "Performance"],
		status: "HOLDED",
    date: "2010-07-10",
    image:
			"https://images.unsplash.com/photo-1725023860191-74206dfd4982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBzdHJpbmclMjBjb25zcGlyYWN5JTIwYm9hcmR8ZW58MXx8fHwxNzc5NTM1MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "test2"
    },
	{
		id: "003",
		title: "Enigma Protocol",
		summary: "Reverse-engineering a legacy authentication system.",
    tags: ["Authentication", "Security", "OAuth"],
		status: "ONGOING",
    date: "2017-09-08",
		image:
			"https://images.unsplash.com/photo-1551029506-0807df4e2031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdpY2FsJTIwZ2xvd2luZyUyMHNwZWxsJTIwYm9va3xlbnwxfHx8fDE3Nzk1MzUxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "text3",
    },
];