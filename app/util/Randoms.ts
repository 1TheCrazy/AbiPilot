export const FiveCharUUID = (): string => {
    let uuid = "";

    for(let i = 0; i < 5; i++)
        uuid += (Math.floor(Math.random() * 256)).toString(16);
        
    return uuid.slice(0, 5);
}