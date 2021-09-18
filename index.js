var express = require('express') //llamamos a Express
var app = express()              
var mysql = require('mysql');
var bodyParser = require('body-parser')        
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var conexion= mysql.createConnection({
    host : 'localhost',
    database : 'personal',
    user : 'root',
    password : 'root',
});


var port = process.env.PORT || 8080  // establecemos nuestro puerto

app.use (function (req, res, next) {
    res.header ("Access-Control-Allow-Origin", "*");
    next();
    });


app.use(express.static('public'));

//api para consumir login
app.post('/Login', function(req, res) {
    let newData = [];
    new Promise((resolve, reject) => {
     
            conexion.query("SELECT * FROM usuario where username='"+ req.body.username +"' and clave='"+ req.body.clave +"'", function (error, results, fields) {
                if (error)
                    throw error;
                else 
                    //  resultdata =  results;
                    newData =  results;
                    res.json({ mensaje: newData }) 
                    console.log(newData);
            });
    });
    
        
})

//api para consumir todos los usuarios
app.get('/usuarios', function(req, res) {
    let newData = [];
    new Promise((resolve, reject) => {
     
            conexion.query('SELECT * FROM usuario', function (error, results, fields) {
                if (error)
                    throw error;
                    
                
              //  resultdata =  results;
              newData =  results;
              res.json({ mensaje: newData }) 
            });
    });
    
        
})


//api para obtener los usuarios por id
app.get('/usuarios/:id', function(req, res) {
    let newData = [];
    new Promise((resolve, reject) => {
     
            conexion.query('SELECT * FROM usuario where idusuario='+ req.params.id, function (error, results, fields) {
                if (error)
                    throw error;
                    
                
              //  resultdata =  results;
              newData =  results;
              res.json({ mensaje: newData }) 
            });
    });
    
        
})

//api para guardar usuarios
app.post('/usuarios', function(req, res) {
    conexion.query('INSERT INTO usuario (nombre, username,clave,estado) VALUES("'+ req.body.nombre + '","'+ req.body.username + '","'+ req.body.clave + '",1)', function (error, results, fields) {
        if (error)
            throw error;
            
        
      //  resultdata =  results;
      res.json({ mensaje: "ok" }) 
    });
})

//api para delete usuario
app.delete('/usuarios/:id', function(req, res) {
    conexion.query('UPDATE usuario set estado = 0 where idusuario='+  req.params.id, function (error, results, fields) {
        if (error)
            throw error;
        
    //console.log(id);
        
      //  resultdata =  results;
      res.json({ mensaje: "ok" }) 
    });
})

//api para usuarios para actualizar
app.put('/usuarios/:id', function(req, res) {
    conexion.query('UPDATE usuario set nombre="'+ req.body.nombre + '", username="'+ req.body.username + '",clave="'+ req.body.clave + '" where idusuario='+ req.params.id, function (error, results, fields) {
        if (error)
            throw error;
            
      //  resultdata =  results;
      res.json({ mensaje: "ok" }) 
    });
})


//api para consumir todos los tipoLogro
app.get('/tipoLogro', function(req, res) {
    let newData = [];
    new Promise((resolve, reject) => {
     
            conexion.query('SELECT * FROM tipologro', function (error, results, fields) {
                if (error)
                    throw error;
                    
                
              //  resultdata =  results;
              newData =  results;
              res.json({ mensaje: newData }) 
            });
    });
    
        
})

//api para obtener los tipoLogro por id
app.get('/tipoLogro/:id', function(req, res) {
    let newData = [];
    new Promise((resolve, reject) => {
     
            conexion.query('SELECT * FROM tipologro where idtipologro='+ req.params.id, function (error, results, fields) {
                if (error)
                    throw error;
                    
                
              //  resultdata =  results;
              newData =  results;
              res.json({ mensaje: newData }) 
            });
    });
    
        
})

//api para guardar tipoLogro
app.post('/tipoLogro', function(req, res) {
    conexion.query('INSERT INTO tipologro (descripcion) VALUES("'+ req.body.descripcion + '")', function (error, results, fields) {
        if (error)
            throw error;
            
        
      //  resultdata =  results;
      res.json({ mensaje: "ok" }) 
    });
})

//api para tipoLogro usuario
app.delete('/tipoLogro/:id', function(req, res) {
    conexion.query('DELETE from tipologro where idtipologro='+  req.params.id, function (error, results, fields) {
        if (error)
            throw error;
        
    //console.log(id);
        
      //  resultdata =  results;
      res.json({ mensaje: "ok" }) 
    });
})

//api para tipoLogro para actualizar
app.put('/tipoLogro/:id', function(req, res) {
    conexion.query('UPDATE tipologro set descripcion="'+ req.body.descripcion + '" where idtipologro='+ req.params.id, function (error, results, fields) {
        if (error)
            throw error;
            
      //  resultdata =  results;
      res.json({ mensaje: "ok" }) 
    });
})




//api para mostrar  personal
app.get('/personal', function(req, res) {
    let newData = [];
    new Promise((resolve, reject) => {
     
            conexion.query('SELECT * FROM personal.personal', function (error, results, fields) {
                if (error)
                    throw error;
                    
                
              //  resultdata =  results;
              newData =  results;
              res.json({ mensaje: newData }) 
            });
    }); 
});

//api para mostrar personal por id
app.get('/personal/:id', function(req, res) {
    let newData = {};
    let datalogro = [];
    let datapersonal = [];
    new Promise((resolve, reject) => {
     
            conexion.query('SELECT * FROM personal where idpersonal=' + req.params.id, function (error, results, fields) {
                if (error)
                    throw error;
                    
                else    
              
                    datapersonal =  results;
                    conexion.query('SELECT * FROM logro where idpersonal=' + req.params.id, function (error2, results2, fields2) {
                        if (error2)
                            throw error2;
                            
                        else
                            //  resultdata =  results;
                            datalogro =  results2;

                            newData= {"datos": datapersonal, "logros:": datalogro}
        
        
                            res.json({ mensaje: newData })
              
                            
                    });
        
                    
            });


             
    }); 
});

//api para guardar el personal
app.post('/personal', function(req, res) {
    let newData = [];
    new Promise((resolve, reject) => {
     
            conexion.query('Insert Into personal (nombre,apellido,telefono,direccion,email,fechanacimiento) ' + 
            " VALUES('"+  req.body.nombre + "','"+  req.body.apellido +"','"+  req.body.telefono +"','"+  req.body.direccion +"','"+  req.body.email +"','"+ req.body.fechanacimiento +"')", function (error, results, fields) {
                if (error)
                    throw error;
                else
                    console.log('asdasd')
                    req.body.logros.forEach(element => {
                        conexion.query('Insert Into logro (descripcion,idtipologro,idpersonal) ' + 
                        " VALUES('"+  element.descripcion +"',"+  element.tipologro +",(select ifnull(max(idpersonal),0) from personal))", function (error, results, fields) {
                            if (error)
                                throw error;
                                    
                            
                            
                        });
                    });

                    res.json({ mensaje: "ok" })
               
            });

           

           
    }); 
});


//api para actualizar el personal
app.put('/personal/:id', function(req, res) {
    let newData = [];
    new Promise((resolve, reject) => {
     
            conexion.query(" update personal set nombre = '"+ req.body.nombre +"', apellido =  '"+ req.body.apellido +"', "+ 
            " telefono = '"+ req.body.telefono +"', direccion = '"+ req.body.direccion +"', email = '"+ req.body.email  +"', fechanacimiento = '"+ req.body.fechanacimiento +"' " + 
            ' where idpersonal = '+ req.params.id, function (error, results, fields) {
                if (error)
                    throw error;
                else 

                    conexion.query('delete from logro where idpersonal = '+ req.params.id, function (error, results, fields) {
                        if (error)
                            throw error;
                        else 
                            req.body.logros.forEach(element => {
                                conexion.query('Insert Into logro (descripcion,idtipologro,idpersonal) ' + 
                                " VALUES('"+  element.descripcion +"',"+  element.tipologro +"," + req.params.id +")", function (error, results, fields) {
                                    if (error)
                                        throw error;
                                    
                                });
                            });    
                        
                            res.json({ mensaje: "ok" })
                    });
            });
    }); 
});

//api para actualizar el personal
app.delete('/personal/:id', function(req, res) {
    let newData = [];
    new Promise((resolve, reject) => {
     
            conexion.query('delete from personal where idpersonal = '+ req.params.id, function (error, results, fields) {
                if (error)
                    throw error;
                    
                
              res.json({ mensaje: "ok" }) 
            });
    }); 
});


// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)