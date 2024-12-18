import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { AuthConstant } from '../constant/authConstant';

export default function AuthGuard(props: any) {
  const cookie = new Cookies();
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (cookie.get('access_token') !== undefined && cookie.get('access_token') !== '') {
      setAuth(true)
    } else {
      navigate('/login')
    }
  }, [navigate]);

  return auth && props.children;
}
