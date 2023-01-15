import React, { useEffect} from 'react'
// import { useNavigate } from 'react-router-dom';
// , useAppSelector 
import { useAppDispatch } from '../hooks/hook';
import { fetchDatas } from '../slices/channelsSlice';
import ChannelsList from './ChannelsList';
import Chat from './Chat';
import Modal from './Modal';

interface HomepageProps {
  
}

const Homepage: React.FC<HomepageProps> = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  
  // // const { error } = useAppSelector((state) => state.channels);

  useEffect(() => {
    dispatch(fetchDatas());
    // if (error) {
    //   localStorage.clear();
    //   navigate('/login');
    // }
  // }, [error, navigate]);
}, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Modal />
        <ChannelsList />
        <Chat />
      </div>
    </div>
  );
}

export default Homepage;