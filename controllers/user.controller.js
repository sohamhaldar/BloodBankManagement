import { db } from "../db/index.js";

const signUp=async(req,res,next)=>{
    try{
        const {name ,blood_group ,age ,email ,password ,total_donation ,total_blood_received }=req.body;
        const [results, fields] = await db.execute(
            'INSERT INTO user(name ,blood_group ,age ,email ,password ,total_donation ,total_blood_received) values(?,?,?,?,?,?,?)',
            [name,blood_group ,age ,email ,password ,total_donation ,total_blood_received]
        );
        console.log(results);
        console.log(fields);
        res.status(201).json({
            message:'User created successfully',
            data:results
        })
        
    } catch (error) {
        next(error);
    }
}

const getAllUsers=async(req,res,next)=>{
    try{
        const [results, fields] = await db.execute(
            'SELECT * FROM `user`'
          );
          res.json({
            data:results
          })
    } catch (error) {
        next(error)
    }
}
const login=async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        const [results, fields] = await db.execute(
            'SELECT * FROM user WHERE email=?',
            [email]
        );
        console.log(results);
        if(results[0].password==password){
            res.json({
                message:'user logged in succesfully',
                data:results
            })
        }
        else{
            res.json({
                message:'password is wrong',
            })
        }

    }catch(error){
        next(error)
    }

}

const donateBlood=async(req,res,next)=>{
    try{
        const{user_id,blood_group,hospital_id,amount}=req.body;
        const [results, fields] = await db.execute('UPDATE availability AS a JOIN hospital AS h ON a.hospital_id = h.hospital_id JOIN blood_group AS bg ON a.blood_id = bg.blood_id SET a.quantity = a.quantity + ? WHERE h.hospital_id = ? AND bg.name = ?;',[amount,hospital_id,blood_group]);
        const[user,fields2]=await db.execute('UPDATE user SET total_donation = total_donation + ? WHERE user_id = ?;',[amount,user_id]);
        res.json({
            message:'blood donated succesfully',
            data:results
        })

        
    }catch(error){
        next(error);
    }
}

const recieveBlood=async(req,res,next)=>{
    try{
        const{user_id,blood_group,hospital_id,amount}=req.body;
        await db.query('START TRANSACTION');
        await db.query('UPDATE availability AS a JOIN blood_group AS b ON a.blood_id = b.blood_id SET a.quantity = GREATEST(a.quantity - ?, 0) WHERE a.hospital_id = ? AND b.name = ?', [amount, hospital_id, blood_group]);
        await db.query('UPDATE user SET total_blood_received = total_blood_received + ? WHERE user_id = ?', [amount, user_id]);
        await db.query('COMMIT');

        res.status(200).json({
            message: 'Blood recieved successfully.',
            data: ""
        });
        
    }catch(error){
        next(error);
    }
}

export {signUp,login,getAllUsers,donateBlood,recieveBlood};