import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-40 h-40 border-t-5 border-b-5 border-secondary rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;