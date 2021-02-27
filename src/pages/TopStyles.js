import styled from 'styled-components';

export const Container = styled.div`
  width: 105%;
  height: 110%;
  background-image: radial-gradient(circle at 50% 0, #180f61, #000000 96%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;

  @media (max-width: 400px) {
    height: 140%;
  }
`;

export const Button = styled.button`
  width: 304px;
  min-height: 48px;
  border-radius: 10px;
  background-color: #ce2c75;
  border: none;
  outline: none;

  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  text-align: center;
  color: #ffffff;
`;

export const Title = styled.h2`
  font-size: 40px;
  font-weight: 500;
  line-height: 1.6;
  text-align: center;
  color: #ffffff;
  margin-top: 4px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    width: 360px;
    font-size: 30px;
  }
`;

export const FeatureText = styled.span`
  color: #ce2c75;
`;

export const Description = styled.p`
  width: 579px;
  font-size: 14px;
  line-height: 1.71;
  text-align: center;
  color: #b7aff3;
  margin-bottom: 36px;

  @media (max-width: 768px) {
    width: 330px;
    margin-bottom: 24px;
  }
`;

export const Coin = styled.img`
  margin-top: -50px;
  @media (max-width: 768px) {
    margin-top: -8px;
  }
`;

export const Br = styled.br`
  display: ${(props) => (props.for === 'desktop' ? 'block' : 'none')};

  @media (max-width: 768px) {
    display: ${(props) => (props.for === 'mobile' ? 'block' : 'none')};
  }
`;

export const Header = styled.header`
  width: 90%;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  padding-top: 32px;
  padding-right: 88px;

  @media (max-width: 768px) {
    padding-top: 16px;
    padding-right: 4px;
    height: 40px;
  }
`;

export const AvatarContainer = styled.div`
  width: 165px;
  height: 48px;
  padding-left: 8px;
  border-radius: 22.5px;
  background-color: #1c1744;
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (max-width: 768px) {
    justify-content: center;
    width: 48px;
    height: 48px;
  }
`;

export const Avatar = styled.div`
  border-radius: 100%;
  width: 32px;
  height: 32px;
  background-position: center;
  background-size: auto 110%;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    margin-left: unset;
  }
`;

export const UserName = styled.p`
  margin-left: 16px;
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  color: #ffffff;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Message = styled.span`
  font-size: 16px;
  margin-top: 20px;

  &.success {
    color: white;
  }

  &.error {
    color: red;
  }

  @media (max-width: 400px) {
    width: 300px;
  }
`;

export const Error = styled.h2`
  color: red;
  font-size: 14px;
`;