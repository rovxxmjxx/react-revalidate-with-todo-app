import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import withNotLoggedIn from '../utils/withNotLoggedIn';
import styled from '@emotion/styled';
import useAuth from '../hooks/useAuth';

type FormValues = {
  email: string;
  password: string;
};

function SignUp() {
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .matches(/[a-z0-9]+@/)
      .required('email is required'),
    password: yup
      .string()
      .matches(/[A-Za-z0-9._%+-]{8,}/)
      .required('password is required'),
  });
  const {
    control,
    handleSubmit,
    reset,
    setFocus,
    setError,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const { signup } = useAuth();
  const onSubmit = (data: FormValues) => {
    signup(data).then((res) => {
      if (res.statusCode === 400) {
        setError('email', { message: '이미 사용중인 이메일이에요:(' });
        setError('password', {});
      } else {
        reset();
        navigate('/signin');
      }
    });
  };

  useEffect(() => {
    setFocus('email');
  }, []);

  return (
    <Container>
      <div className="header">
        <h1>회원가입</h1>
        <p>
          <Link to="/signin">로그인</Link>으로 이동하기
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <span className="label">이메일</span>
          <Input id={'email-input'} control={control} name={'email'} />
        </InputWrapper>
        <InputWrapper>
          <span className="label">패스워드</span>
          <Input
            id={'password-input'}
            control={control}
            name={'password'}
            type="password"
          />
        </InputWrapper>
        <Button
          id={'signup-button'}
          title={'가입하기'}
          disabled={!isValid}
          style={{ padding: '10px 12px', fontSize: '14px' }}
        />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
      </form>
    </Container>
  );
}

export default withNotLoggedIn(SignUp);

export const Container = styled.div`
  max-width: 300px;
  margin: auto;

  > .header {
    margin-top: 50px;
    margin-bottom: 20px;

    > h1 {
    }

    > p {
      margin-top: 10px;
      font-size: 13px;
    }
  }

  > form {
    display: flex;
    flex-direction: column;
  }
`;

export const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  > .label {
    font-size: 13px;
    margin-bottom: 2px;
  }

  > input {
    padding: 10px 12px;
    font-size: 15px;
    border: 1px solid gray;
  }
`;

export const ErrorMessage = styled.p`
  margin-top: 10px;
  font-size: 13px;
  color: red;
`;
