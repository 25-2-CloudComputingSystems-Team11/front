import React from 'react';

const ButtonArea = ({ changeMode, mode }) => {
  const getButtonStyle = (targetMode) => ({
    backgroundColor: mode === targetMode ? '#4a90e2' : '#6c757d',
    color: 'white'
  });

  return (
    <footer className="button-area">
      <button onClick={() => changeMode('basic')} style={getButtonStyle('basic')}>
        기본 챗봇
      </button>

      <button onClick={() => changeMode('readme')} style={getButtonStyle('readme')}>
        README 생성
      </button>

      <button onClick={() => changeMode('resume')} style={getButtonStyle('resume')}>
        이력서 생성
      </button>

      <button onClick={() => changeMode('translate')} style={getButtonStyle('translate')}>
        이력서 번역
      </button>
    </footer>
  );
};

export default ButtonArea;
