import asyncHandler from 'express-async-handler'
import xlsx from "xlsx"
import Company from '../models/CompanyModel.js'
import File from '../models/FileModel.js'
import { geocode, RequestType,setDefaults } from "react-geocode";
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const addCompany = asyncHandler(async (req, res) => {
  setDefaults({
    key: "AIzaSyAnZ0uqxFaPcMqQECrAQMznDtMDbpcKrZA", // Your API key here.
    language: "en", // Default language for responses.
    region: "es", // Default region for responses.
  });

  const xlsReader=xlsx;
  const workbook = xlsReader.readFile("./uploads/"+req.body.body);
  const sheetnames = workbook.SheetNames[0];
  const data = xlsReader.utils.sheet_to_json(workbook.Sheets[sheetnames]);
  const {companyName,detail1,detail2,president,poscode,address}=data[0];
  let lat;
  let long;
  await geocode(RequestType.ADDRESS, data[0].address)
  .then((response) => {
    lat=response.results[0].geometry.location.lat;
    long=response.results[0].geometry.location.lng;
   
    
    })
  .catch((error) => {
    console.error(error);
  });

  let hubs='{"arr":[';
  for(let i=1;i<data.length;i++)
  {
      
      await geocode(RequestType.ADDRESS, data[i].address)
      .then((response) => {

        hubs+='{"address":"'+data[i].address+'","name":"'+data[i].hubname+'","lat":"'+response.results[0].geometry.location.lat+'","long":"'+response.results[0].geometry.location.lng+'","show":false}';
        if(i!=data.length-1)
        {
          hubs+=","
   
        }
        })
      .catch((error) => {
        console.error(error);
      });
      
      
      
  }
  hubs+="]}";
  const generateColor=()=>{
    let colorStyle="RGB("
    for(let i=0;i<3;i++)
    {
        const randomecolorNum= Math.floor(Math.random() * (255 - 0 + 1)) + 0;
        colorStyle+=randomecolorNum;
        if(i==2)
        {
          colorStyle+=")";
        }
        else
        {
          colorStyle+=",";
        }
    }
    return colorStyle
  }
  const color = generateColor();
  const motherColor=generateColor()
  const roundColor=generateColor()
  console.log(lat,long )
      // Initialize the Geocoder
  const result = await Company.create({
    companyName,
    detail1,
    detail2,
    president,
    poscode,
    lat:lat,
    address,
    color,
    motherColor,
    roundColor,
    long:long,
    show:false,
    hubs,
  })
  if(result)
  {
    const companyList = await Company.find({ }).sort({updatedAt: -1});
    const updateReault=await File.updateOne({'filename':req.body.body},{$set:{'Status':true}},{multi:true});
    console.log(updateReault)
    if (updateReault) {
      return res.json(companyList)
    } else {
      res.status(401)
      throw new Error('Invalid file data')
    }
    
  }
})
const getCompany = asyncHandler(async (req,res)=>{
  const companyList = await Company.find({ }).sort({UploadDate: -1});
  return res.json(companyList)
})
export {
  getCompany,
  addCompany,
}
