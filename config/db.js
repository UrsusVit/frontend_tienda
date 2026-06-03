const mongoose=require('mongoose');

const conexion=async()=>{
    try{
        await mongoose.connect('mongodb+srv://MRL:qwerty51@cluster.288xkpq.mongodb.net/?appName=Cluster')
        console.log('Conexión con base de datos exitosa')
    }catch(error){
        console.error('Error al conectar a la base de datos');
    }
}

module.exports=conexion;