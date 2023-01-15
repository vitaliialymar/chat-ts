import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { useTranslation } from 'react-i18next';
import {
  Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { actions } from '../slices/channelsSlice';
import { show } from '../slices/modalsSlice';
import type { Modal } from '../slices/modalsSlice'

interface ChannelProps {
  id: number,
  name: string,
  removable?: boolean,
}

const Channel: React.FC<ChannelProps> = ({ id, name }) => {
  const dispatch = useAppDispatch();
  const currentChannelId = useAppSelector((state) => state.channels.currentChannelId);
  return (
    <li className="nav-item w-100">
      <Button
        variant={id === currentChannelId ? 'secondary' : ''}
        onClick={() => dispatch(actions.changeChannel(id))}
        type="button"
        className="w-100 rounded-0 text-start btn"
      >
        <span className="me-1">#</span>
        {name}
      </Button>
    </li>
  );
};

const RemovableChannel: React.FC<ChannelProps> = ({ id, name }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const currentChannelId = useAppSelector((state) => state.channels.currentChannelId);
  const showModal = (modal: Modal) => dispatch(show(modal));

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex dropdown">
        <Button
          variant={id === currentChannelId ? 'secondary' : ''}
          className="w-100 rounded-0 text-start text-truncate"
          type="button"
          onClick={() => dispatch(actions.changeChannel(id))}
        >
          <span className="me-1">#</span>
          {name}
        </Button>

        <Dropdown.Toggle split variant={id === currentChannelId ? 'secondary' : ''} id="dropdown-split-basic" className="flex-grow-0">
          <span className="visually-hidden">{t('channels.control')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => showModal({ type: 'removing', item: id })} eventKey="1">{t('channels.remove')}</Dropdown.Item>
          <Dropdown.Item onClick={() => showModal({ type: 'renaming', item: id })} eventKey="2">{t('channels.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

const ChannelsList: React.FC = () => {
  const { t } = useTranslation();
  const { channels } = useAppSelector((state) => state.channels);
  
  const dispatch = useAppDispatch();

  const showModal = (modal: Modal) => dispatch(show(modal));

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.ch')}</span>
        <Button onClick={() => showModal({ type: 'adding', item: 0 })} variant="outline-light" type="button" className="p-0 text-primary btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((ch) => ch.removable ? (
          <RemovableChannel
            key={ch.id}
            {...ch}
          />) : (
          <Channel
            key={ch.id}
            {...ch}
          />
          ))}
      </ul>
    </div>
  );
};

export default ChannelsList;
