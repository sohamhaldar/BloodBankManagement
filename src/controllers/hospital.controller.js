import { db } from "../db/index.js";

// const addHospital=async(req,res,next)=>{
//     try{
//         const{name ,phone_number}=req.body;
//         const [hospital,fields]=await db.query("INSERT INTO hospital(name,phone_number) VALUES(?,?)",[name,phone_number]);
//         console.log(hospital);
//         const [available,field2]=await db.query("INSERT INTO availablity(hospital_id,blood_id,quantity) VALUES ?",[
//             [hospital.insertId,1,0],
//             [hospital.insertId,2,0],
//             [hospital.insertId,3,0],
//             [hospital.insertId,4,0],
//             [hospital.insertId,5,0],
//             [hospital.insertId,6,0],
//             [hospital.insertId,7,0],            
//             [hospital.insertId,8,0]
//         ])

//         res.status(201).json({
//             message:"Hospital added successfully",
//             data:hospital,
//             availablity:available
//         })
        
//     }catch(error){
//         next(error);   
//     }
// }
const addHospital = async (req, res, next) => {
    try {
      const { name, phone_number } = req.body;
      const [hospital, fields] = await db.query(
        "INSERT INTO hospital(name,phone_number) VALUES(?,?)",
        [name, phone_number]
      );
      console.log(hospital);
      const [available, field2] = await db.query(
        "INSERT INTO availability(hospital_id,blood_id,quantity) VALUES ?",
        [[
          [hospital.insertId, 1, 0],
          [hospital.insertId, 2, 0],
          [hospital.insertId, 3, 0],
          [hospital.insertId, 4, 0],
          [hospital.insertId, 5, 0],
          [hospital.insertId, 6, 0],
          [hospital.insertId, 7, 0],
          [hospital.insertId, 8, 0],
        ]]
      );
      res.status(201).json({
        message: "Hospital added successfully",
        data: hospital,
        availablity: available,
      });
    } catch (error) {
      next(error);
    }
  };

  const getAllHospitals=async(req,res,next)=>{
    try{
        const [hospitals,fields]=await db.query(`SELECT h.hospital_id, h.name AS hospital_name, h.phone_number, SUM(CASE WHEN bg.name = 'A+' THEN a.quantity ELSE 0 END) AS A_positive_quantity, SUM(CASE WHEN bg.name = 'A-' THEN a.quantity ELSE 0 END) AS A_negative_quantity, SUM(CASE WHEN bg.name = 'B+' THEN a.quantity ELSE 0 END) AS B_positive_quantity, SUM(CASE WHEN bg.name = 'B-' THEN a.quantity ELSE 0 END) AS B_negative_quantity, SUM(CASE WHEN bg.name = 'AB+' THEN a.quantity ELSE 0 END) AS AB_positive_quantity, SUM(CASE WHEN bg.name = 'AB-' THEN a.quantity ELSE 0 END) AS AB_negative_quantity, SUM(CASE WHEN bg.name = 'O+' THEN a.quantity ELSE 0 END) AS O_positive_quantity, SUM(CASE WHEN bg.name = 'O-' THEN a.quantity ELSE 0 END) AS O_negative_quantity FROM hospital h LEFT JOIN availability a ON h.hospital_id = a.hospital_id LEFT JOIN blood_group bg ON a.blood_id = bg.blood_id GROUP BY h.hospital_id, h.name, h.phone_number;`);        
        res.status(200).json({
            message:"Hospitals fetched successfully",
            data:hospitals
        })

    }catch(error){
        next(error);
    }
  }

export {addHospital,getAllHospitals};