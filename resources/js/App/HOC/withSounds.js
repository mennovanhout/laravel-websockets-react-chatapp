import React from 'react';
import useSound from "use-sound";

import messageSfx from '../../../sounds/message.mp3';

export const withSounds = (Component) => {
    return (props) => {
        const [playNewMessage] = useSound(messageSfx);

        return <Component playNewMessage={playNewMessage} {...props} />;
    };
};
