import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { styled, keyframes } from '@stitches/react';
import { violet, blackA, mauve, green } from '@radix-ui/colors';
import { Cross2Icon, CrossCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const DialogDemo = ({id, duty, assignDuty, days,officers, setRoster, handleRemoveOfficer,roster}) =>{
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOfficer,setSelectedOfficer]= useState('');
  const [dutyDescription,setDutyDescription]= useState('');
  // const [onboardOfficers,setonboardOfficers] = useState([]);
  const onboardOfficers=roster[duty] ? roster[duty][days.day] : []
  // console.log(onboardOfficers)
  const handleAssign = async () => {
    if (selectedOfficer) {
      await assignDuty(selectedOfficer, duty, days, dutyDescription,);
      // fetchOnBoardOfficers();
    }
  };
  const handleRemove =async (officer) => {
    await handleRemoveOfficer(officer,duty,days);
    // fetchOnBoardOfficers();
  }
  const handleSelectOfficer = (officer) => {
    if (selectedOfficer == officer) {
      setSelectedOfficer("");
    } else {
      setSelectedOfficer(officer);
    }
  }
  // const fetchOnBoardOfficers = async () => {
  //   try {
  //     const res=await axios.post(`${apiUrl}/getOnboardOfficers`,{ duty: duty, cron_time: days.cron_time});
  //     setonboardOfficers(res.data);
  //     const officersData=res.data;
  //     if(officersData.length > 0){
  //       setRoster(roster => {
  //         return  {
  //            ...roster,
  //            [duty]: {
  //              ...roster[duty],
  //              [days.day]: officersData[0].ioname,
  //            },
  //          }
  //        })
  //     }
  //   } catch(error) {
  //     console.error('Error fetching officers:', error)
  //   }
  // }
  useEffect(() => {
    // fetchOnBoardOfficers();
  }, []);
  // useEffect(() => {
  //      try {
  //       const res = axios.post(`${apiUrl}/getofficers`,{},{
  //        headers: {
  //         "jwt_token" : localStorage.getItem('token')
  //        }
  //       })
  //       console.log(res.data)
  //       setOfficers(res.data)
  //      } catch (error) {
  //       console.log('error while fetching : ',error)
  //      }
  // }, []);
  const isOfficer = officers.length>0;
  return (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button css={{borderRadius: "50%",height: '25px', width: '25px', padding:'0'}}>
        <PlusCircledIcon />
      </Button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>Assign Officer</DialogTitle>
        {/* <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription> */}
        <Fieldset>
          <Label htmlFor="name">Name</Label>
          <Input id="name"  value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
        </Fieldset>
        {/* <Fieldset>
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue={duty} />
        </Fieldset> */}
        {  isOfficer && <DialogDescription>
          select from the List : 
        </DialogDescription>}
          { isOfficer &&
        <List css={{display: 'grid', gridTemplateColumns:'repeat(2, minmax(0, 1fr))',gridTemplateRows: "repeat(5, min-content)", gap:'1rem'}}>
            {officers.filter(officer =>
              searchTerm.length === 0 ||
              officer.ioname.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((officer, index) => (
              <ListItem key={index} onClick={() =>handleSelectOfficer(officer)} css={{ background : selectedOfficer.id == officer.id ? '#00b5ff' : '',
                color : selectedOfficer.id == officer.id ? 'white' : 'black',
              }}>
                {officer.ioname}
              </ListItem>
            ))}
        </List>
          }
        <Fieldset>
          <Label htmlFor="description">Description</Label>
          <Input id="description"  value={dutyDescription}
            onChange={(e) => setDutyDescription(e.target.value)}/>
        </Fieldset>
        <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <Button variant="green" onClick={handleAssign}>Save changes</Button>
          </Dialog.Close>
        </Flex>
        {  onboardOfficers && onboardOfficers.length > 0 && <DialogDescription>
          Officers on Duty: 
        </DialogDescription>}
          <List css={{display: 'grid', gridTemplateColumns:'repeat(2, minmax(0, 1fr))',gridTemplateRows: "repeat(5, min-content)", gap:'1rem',height:'auto'}}>
          { onboardOfficers.length > 0 &&
            onboardOfficers.map((officer, index) => (
              <ListItem key={index} variant={"onBoard"}>
                {officer.ioname}
                <Button variant={"cancelOnBoard"} css={{borderRadius: "50%",height: '25px', width: '25px', padding:'0'}} onClick={() => handleRemove(officer)}>
                  <CrossCircledIcon />
                </Button>
              </ListItem>
            ))
          }
        </List>
        <Dialog.Close asChild>
          <IconButton aria-label="Close">
            <Cross2Icon />
          </IconButton>
        </Dialog.Close>
      </DialogContent>
    </Dialog.Portal>
  </Dialog.Root>
);
}
const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: blackA.blackA6,
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  zIndex: 1002
});

const DialogContent = styled(Dialog.Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  height:'80vh',
  maxWidth: '800px',
  maxHeight: '85vh',
  padding: 25,
  zIndex: 1003,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
});

const DialogTitle = styled(Dialog.Title, {
  margin: 0,
  fontWeight: 500,
  color: mauve.mauve12,
  fontSize: 17,
});

const DialogDescription = styled(Dialog.Description, {
  margin: '10px 0 10px',
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

const Flex = styled('div', { display: 'flex' });
const List = styled('ul',{
  listStyleType: 'none',
  height: '200px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'grey',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
});
const ListItem = styled('li',{ 
  position: 'relative',
  padding : '5px 5px',
  borderRadius: '5px', 
  border: '2px solid var(--border-stoke)',
  cursor: 'pointer',
  height:  'max-content',
  transition: 'all linear 150ms',
  variants: {
    variant: {
      default: {
        '&:hover': { backgroundColor: '#00b5ff', color : 'white' }
      },
      onBoard: {
        '&:hover': { backgroundColor: 'initial', color : 'initial' }
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  // width: 25,
  // borderRadius : '50%',
  variants: {
    variant: {
      violet: {
        backgroundColor: 'white',
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA4}`,
        '&:hover': { backgroundColor: mauve.mauve3 },
        '&:focus': { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        '&:hover': { backgroundColor: green.green5 },
        '&:focus': { boxShadow: `0 0 0 2px ${green.green7}` },
      },
      cancelOnBoard: {
        position : 'absolute',
        right : 0,
        top : 0,
        backgroundColor: 'white',
        color: violet.violet11,
        // boxShadow: `0 2px 10px ${blackA.blackA4}`,
        transition : 'all linear 150ms',
        '&:hover': { backgroundColor: mauve.mauve3 },
        '&:focus': { boxShadow: `0 0 0 0px transparent` },
      }
    },
  },

  defaultVariants: {
    variant: 'violet',
  },
});

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: violet.violet11,
  position: 'absolute',
  top: 10,
  right: 10,

  '&:hover': { backgroundColor: violet.violet4 },
  '&:focus': { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  margin: '15px 0 15px'

});

const Label = styled('label', {
  fontSize: 15,
  color: violet.violet11,
  width: 90,
  textAlign: 'right',
});

const Input = styled('input', {
  all: 'unset',
  width: '100%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  fontSize: 15,
  lineHeight: 1,
  color: violet.violet11,
  boxShadow: `0 0 0 1px ${violet.violet7}`,
  height: 35,

  '&:focus': { boxShadow: `0 0 0 2px ${violet.violet8}` },
});

export default DialogDemo;