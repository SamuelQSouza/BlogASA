module.exports = {
    eadmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.isadmin == true){
            return next();
        }

        else{
            req.flash('error_msg', 'Voce precisa ser um admin... ');
            res.redirect('/');
        };
    }
};