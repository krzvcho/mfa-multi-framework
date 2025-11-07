import React from 'react';
import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProgressContainer = styled('div')(({ theme }) => ({
    width: '100%',
}));

export default () => {
    return (
        <ProgressContainer>
            <LinearProgress />
        </ProgressContainer>
    );
};