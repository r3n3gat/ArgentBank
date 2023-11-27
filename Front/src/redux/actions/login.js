// authActions.js
export const login = (userData) => {
    return async (dispatch) => { 
      try {
        console.log('Sending userData:', userData); // Affiche les données envoyées

        const response = await fetch('http://localhost:3001/api/v1/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        console.log('HTTP Response:', response.status);  // Affiche le statut de la réponse HTTP

        if (response.status === 200) {
          const data = await response.json();
          console.log('Response data:', data); // Affiche les données de la réponse
          
          dispatch({
            type: 'LOGIN',
            payload: {
              token: data.body.token,
            }
          });
        } else {
          const errorData = await response.json(); // Récupère les détails de l'erreur
          console.log('Error Response:', errorData); // Affiche les détails de l'erreur

          dispatch({
            type: 'AUTH_ERROR',
            payload: {
              error: 'Email ou mot de passe non valides',
            }
          });
        }
      } catch (error) {
        console.error('Login error:', error); // Affiche les erreurs de fetch
        dispatch({
          type: 'AUTH_ERROR',
          payload: {
            error: 'Erreur de connexion',
          }
        });
      }
    };
};
