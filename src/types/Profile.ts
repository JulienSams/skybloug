export interface Profile {
  photo: string | null;
  name: string;
  bio: string;
  age: number | null;
  location: string;
}

export const defaultProfile: Profile = {
  photo: null,
  name: 'Utilisateur',
  bio: 'Bienvenue sur mon skyblog! Ici je partage ma passion pour la musique, mes photos et mes coups de cœur du moment.',
  age: 25,
  location: 'Paris, France',
};
