
import mysql from "mysql2"
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host   : process.env.MYSQL_HOST,            
    user   : process.env.MYSQL_USER,           
    password: process.env.MYSQL_PASSWORD,    
    database: process.env.MYSQL_DATABASE     

}).promise()


export async function addNewUser(username,otp,userType){
    const [rows] = await pool.query("insert into user (user_type,username,otp,isdeleted) values(?,?,?,0)",[userType,username,otp]);
    return rows  
}

export async function getOtp(username){
    const [rows] = await pool.query("select otp from user where username=?",[username]);
    return rows 
}
export async function otpVerified(username){
    const [rows] = await pool.query("update user set otp='verified' where username=?",[username]);
    return rows 
}
export async function isOtpVerified(username){
    const [rows] = await pool.query("select otp from user where username=?",[username]);
    return rows 
}





export async function  registerNewUser(username,password,userType){
    const [rows] = await pool.query("update user set password=?,user_type=?,created_date=current_timestamp where username=?",[password,userType,username]);
    return rows  
}
export async function  resetPassword(username,hashedPassword,userType){
    const [rows] = await pool.query("update user set password=?,user_type=?,modified_date=current_timestamp where username=?",[hashedPassword,userType,username]);
    return rows  
}


export async function verifyIsUsernameAlreadyExist(username){
    const [row] =  await pool.query('select * from user where username =?', [username])
  
    return  row
      
  }


export async function getExistUserPassword(username){
    const [row] =  await pool.query('select password from user where username =?', [username])
  
    return  row
      
  }


  export async function updateLoginLog(UUID){
    const [rows] = await pool.query("update user set last_login_date=current_timestamp where UUID=?",[UUID]);
    return rows  
} 


export async function getUUIDOfLoggedInUser(username){
    const [row] =  await pool.query('select * from user where username =?', [username])
  
    return  row
      
  }
//   export async function isSignedUserExist(username,token){
//     const [row] =  await pool.query('select * from user where username=? and token=?', [username,token])
     
//     return  row
      
//   }

export async function addNewSignInUser(username){
    const [row] =  await pool.query('select * from user where username =?', [username])
  
    return  row
      
  }
  export async function getUUIDOfSignInUser(username){
    const [row] =  await pool.query('select * from user where username =?', [username])
  
    return  row
      
  }
  export async function isSignedUserExist(username){
    const [row] =  await pool.query('select * from user where username =?', [username])
  
    return  row
      
  }



  export async function googleSignInUserExist(userId){
    const [row] =  await pool.query('select * from user where token=?', [userId])
    console.log(row.length)
    
    if(row.length!=0){
        return  true
    }
   
    else{
        return false 
    }
       
  }
  export async function updateGoogleSignInLog(userId){
    const [row] =  await pool.query('update user set last_login_date=current_timestamp where token=?', [userId])
  
    return  row
      
  }
  export async function addNewGoogleSignInUser(userId){
    const [row] =  await pool.query("insert into user(user_type,username,token,isdeleted,created_date,last_login_date) values('Google','',?,0,current_timestamp,current_timestamp)", [userId])
  
    return  row
      
  }
  export async function getGoogleUserData(userId){
    const [row] =  await pool.query('select * from user  where token=?', [userId])
  
    return  row
      
  }

//   url management


export async function getMappedLongUrlOf(shortUrl){
  // try {
  
    const [rows] = await pool.query("select * from url_details where shortURL=?",[shortUrl]);
    
   
  return rows
  // } catch (error) {
  //   return null
  // }
  
}


export async function getUserUrlHistory(UUID){
    const [rows] = await pool.query("select * from url_details where UUID=? and isdeleted=0",[UUID]);
    return rows  
}

export async function isNewUrlAlreadyExist(newurl){
    const [row] = await pool.query("select * from url_details where originalURL = ?", [newurl])
    console.log(row)
    if(row.length==0)
       
       return false
    else
       return true
}

export async function isAlreadyShortUrlExist(shortUrl){
    const [row] = await pool.query("select * from url_details where shortURL = ? and isdeleted=0", [shortUrl])
    if(row.length==0)
       return false
    else
       return true
}


export async function getShortUrlOf(originalUrl){
    const [row] = await pool.query("select shortURL from url_details wher ce originalURL = ?", [originalUrl])
    return row


}
export async function insertShortUrl(newURL,shortUrl,UUID){
    const [rows] = await pool.query("insert into url_details values(?,?,?,0,current_timestamp,current_timestamp)",[UUID,newURL,shortUrl]);
    return rows  
}

export async function modifyUrlData(UUID, longOldUrl, longNewUrl){
    const [rows] = await pool.query("update url_details set originalURL=?,modified_on=current_timestamp where uuid=? and originalURL=?",[longNewUrl,UUID,longOldUrl]);
    return rows  
} 

export async function deleteUrlData( longUrl){
    const [rows] = await pool.query("update url_details set isdeleted=1 where originalURL=?",[longUrl]);
    return rows  
}
export async function deleteToken(username, token){
    const [rows] = await pool.query("update user set token='' where username=? and token=?",[username,token]);
    return rows  
}





// export async function updateTemperature(city , temp){
//     const [row] =  await pool.query('Update temperature set temp=? where city=?', [temp, city])
//     const id = row.insertId  
//     return  getTemperatureOf(city)
      
//   }

// export async function insertTemperature(city , temp){

//        var timestamp = new Date(). getTime(); 
//        const [row] =  await pool.query('insert into temperature (city,temp) values (?,?)',[city,temp])
//        const id = row.insertId  
//        return  getTemperatureOf(city)

    
// }



// export async function deleteTemperatureOf(city){
   
//     const [row] = await pool.query("delete from temperature where city =?", [city])
//     var action  = "successfully deleted"
//     return getAllTemperature()
// }




// module.exports.getTemperatureOf = getTemperatureOf;
// module.exports.insertTemperature= insertTemperature;


