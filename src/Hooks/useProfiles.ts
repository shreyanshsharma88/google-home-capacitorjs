export const UseProfiles = () => {
    const useProfiles: IProfile[] = [
        {
            name: 'Aloha',
            id: '1',
            email: 'alohahere@gmail.com',
            image: 'https://randomuser.me/api/portraits/men/75.jpg'
        },
        {
            name: 'Amigo',
            id: '2',
            email : 'amigohere@gmail.com',
            image: 'https://randomuser.me/api/portraits/women/75.jpg'
        },
        {
            name: 'Jingo Jango',
            id: '3',
            email: 'jingo@gmail.com',
            image: 'https://randomuser.me/api/portraits/women/77.jpg'
        }
    ]
    return {
        useProfiles,
        defaultProfile: useProfiles[0],
    }
}

export interface IProfile {
    name: string;
    id: string;
    email: string;
    image: string;
}