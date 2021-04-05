export const errorMessages: { [code: string]: string } = {
    'auth/auth-error': 'login ou mot de passe incorrect',
    'auth/user-not-found': 'L\'utilisateur n\'a pas été trouvé. Essayez de vous reconnecter.',
    'auth/refresh-token': 'Refresh token not exist',
    'auth/access-token': 'access_token not exist',
    'common/list-empty': 'votre liste est vide, veuillez l’initialiser',
    'common/model-added': 'inscription refusée vérifiez vos données',
    'auth/access-token-valid': 'Token still valid',
    'demand/update-status': 'you have problem with all theses fields [ id OR status ]',
    'demand/update-demand-status': "vous n'etes pas authorise pour faire l'operation suivante",
    'demand/user-not-authorized': 'you do not have permission to make this action',
    'demand/update-all': "vous n'avez pas le droit de mettre a jours cette demand",
    'demand/update-status-done': 'Vous devez saisir la date de livraison'
};
