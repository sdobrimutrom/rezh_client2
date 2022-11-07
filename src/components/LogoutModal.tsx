import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../hooks/redux';
import { logout } from '../store/reducers/userSlice';

interface LogoutModalProps {
    open: boolean;
    handleClose: () => void;
}

export default function LogoutModal({ open, handleClose }: LogoutModalProps) {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const handleLogoutClick = () => {
        handleClose();
        localStorage.setItem('access_token', '');
        dispatch(logout());
        navigate('/');
    };

    return (
        <div></div>
        // <Modal
        //     open={open}
        //     onClose={handleClose}
        //     style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        //     aria-labelledby="parent-modal-title"
        //     aria-describedby="parent-modal-description">
        //     <Card
        //         sx={{
        //             boxShadow: 6,
        //             borderRadius: 3,
        //             border: 'none',
        //             width: 500
        //         }}>
        //         <Grid container paddingTop={2} justifyContent={'flex-end'}>
        //             <Button onClick={handleClose} style={{ backgroundColor: 'transparent' }}>
        //                 <Close color="disabled" />
        //             </Button>
        //         </Grid>
        //         <Box padding={6} paddingTop={1}>
        //             <Grid container direction={'column'} gap={4} justifyContent={'space-between'}>
        //                 <Grid container direction={'column'} justifyContent={'space-between'}>
        //                     <Typography variant="h4" fontWeight={700}>
        //                         Выход из аккаунта
        //                     </Typography>
        //                     <Typography variant="subtitle1" fontWeight={600} color={'gray'}>
        //                         Вы уверены что хотите выйти?
        //                     </Typography>
        //                 </Grid>
        //                 <Grid container direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        //                     <Button variant={'contained'} onClick={handleLogoutClick}>
        //                         Да
        //                     </Button>
        //                     <Button variant={'outlined'} onClick={handleClose}>
        //                         Нет
        //                     </Button>
        //                 </Grid>
        //             </Grid>
        //         </Box>
        //     </Card>
        // </Modal>
    );
}
