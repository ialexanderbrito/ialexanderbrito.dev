export interface AboutResponse {
  about: About;
}

export interface About {
  slug: string;
  introduction: Introduction;
  profilePicture: ProfilePicture;
}

export interface ProfilePicture {
  url: string;
}

export interface Introduction {
  html: string;
}
