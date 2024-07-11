interface NavigationData {
  name: string;
  params?: {};
}

type Screens =
  {
    name: 'IntroductionStack';
  }
  | {
    name: 'AuthenticationStack';
  }
  
export type { NavigationData, Screens };