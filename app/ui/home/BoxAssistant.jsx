'use client';
import { useState } from "react"
import img1 from "../../../public/img1.jpg"
import Image from 'next/image'
import ButtonRoles from '../ButtonRoles'
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PopDeleteAssistant from "./PopDeleteAssistant"
import PopUpdateAssistant from "./PopUpdateAssistant"
const BoxAssistant = ({name , phone , roles , id  , restartData}) => {
  const roleValue = roles && roles.length > 0 ? roles[0].value : '';
  const [showDelete , setShowDelete] = useState(false)
  const [showEdit , setShowEdit] = useState(false)
  console.log("the roles are", JSON.stringify(roles));
  return (

  <div className="relative">
    {showDelete && (
      <div className="overlay">
        <PopDeleteAssistant restartData={restartData} name={name} id={id} onCansle={() => {setShowDelete(!showDelete)}}/>
      </div>
    )}
      {showEdit && (
      <div className="overlay">
        <PopUpdateAssistant  id={id} restartData={restartData} rol={roleValue} names={name} phones={phone} onCansle={() => {setShowEdit(!showEdit)}}/>
      </div>
    )}


  <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
<Card
  orientation="horizontal"
  sx={{
    width: '100%',
    flexWrap: 'wrap',
    [`& > *`]: {
      '--stack-point': '500px',
      minWidth:
        'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
    },
    backgroundColor: 'transparent', 
    backgroundImage: 'linear-gradient(392deg, rgb(0,0,0),rgb(17,25,40))', 
    overflow: 'auto',
    resize: 'none',
    border: "none",
  }}
>
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <Image
            src={img1}
            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent>
          <div>  
          <div className="flex items-center flex-row-reverse	justify-between"> 
          <Typography fontSize="xl" fontWeight="xl"  textColor="#00ffe5" textAlign="end" marginBottom="10px">
            {name}
          </Typography>
          <div className="flex flex-col gap-4 cursor-pointer">
          <div className="text-color-red text-xl" onClick={() => setShowDelete(!showDelete)}><DeleteIcon fontSize="large" /> </div>
          <div className="text-color-text text-xl" onClick={() =>setShowEdit(!showEdit)}><EditIcon fontSize="large" /> </div>
          </div> 
          </div>
            
            <div> 
          <Typography level="body-sm" fontSize="xl" fontWeight="lg" textColor="white" textAlign="end" marginBottom="10px">
          {phone}
          </Typography>
            </div>
          </div>

            <div className="flex flex-wrap	 w-full	justify-around gap-2"> 
    {roles.map((rol) =>(
      <ButtonRoles text={rol.value} key={rol.id} />

    ))}


            </div>
        </CardContent>
      </Card>
    </Box>
  </div>

  )
}

export default BoxAssistant






