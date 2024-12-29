const getUserACId = () => {
    const currentUrl = window.location.href;
    const match = currentUrl.match(/\/(\w+)(?:\?.*)?$/);
    if (match) {
        return match[1];
    }
    return null;
};

export const setContactToFailedList = async () => {
    try {
        const userACId = getUserACId();
        const userResponse = await fetch(
            `http://localhost:3000/users/${userACId}`
        );
        const { name, googleName, mainRoomNumber, loginCredential } =
            await userResponse.json();

        const dataResponse = await fetch('http://localhost:3000/getData');
        const { data } = await dataResponse.json();

        const sheetName = 'Main room ' + mainRoomNumber;
        const spreadSheetId = data[0][1];

        await fetch('http://localhost:3000/setData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sheetName: 'Tech check',
                spreadSheetId,
                data: [name, googleName, 'Failed', mainRoomNumber],
            }),
        });

        fetch('http://localhost:3000/getEmailsFromEntered', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: loginCredential,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then(async ({ data }) => {
                if (data) {
                    return;
                }

                await fetch('http://localhost:3000/setData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sheetName: 'Entered',
                        spreadSheetId,
                        data: [
                            loginCredential,
                            name,
                            googleName,
                            mainRoomNumber,
                        ],
                    }),
                });

                await fetch('http://localhost:3000/setData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sheetName,
                        spreadSheetId,
                        data: [name, googleName],
                    }),
                });
            });
    } catch (error) {
        console.log(error.message);
    }
};
