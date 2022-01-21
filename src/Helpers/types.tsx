interface Client {
  id: string;
  name: string;
  // username: string | undefined;
  email: string;
  // address: {
  // street: string | undefined;
  // suite: string | undefined;
  // city: string | undefined;
  // zipcode: string | undefined;
  // geo: {
  // lat: string | undefined;
  // lng: string | undefined;
  // };
  // };
  // phone: string | undefined;
  // website: string | undefined;
  // company: {
  // name: string | undefined;
  // catchPhrase: string | undefined;
  // bs: string | undefined;
  // };
}

interface Credentials {
  user: string;
  password: string;
}

type RootStackParamList = {
  Login:
    | {setIsSigned: React.Dispatch<React.SetStateAction<boolean>>}
    | undefined;
  Register:
    | {setIsSigned: React.Dispatch<React.SetStateAction<boolean>>}
    | undefined;
  List:
    | {setIsSigned: React.Dispatch<React.SetStateAction<boolean>>}
    | undefined;
  Create: Client | undefined;
};

export type {Client, RootStackParamList, Credentials};
