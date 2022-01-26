interface Client {
  id: number;
  name: string;
  email: string;
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
  Clients:
    | {setIsSigned: React.Dispatch<React.SetStateAction<boolean>>}
    | undefined;
  Welcome: undefined;
  ClientForm: {client: Client} | undefined;
};

interface iClientContext {
  clients: Client[] | null;
  deleteClient: (id: number | undefined) => void;
  addClient: (client: Client) => void;
  updateClient: (client: Client) => void;
}

export type {Client, RootStackParamList, Credentials, iClientContext};
