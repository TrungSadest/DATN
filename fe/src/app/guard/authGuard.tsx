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
    if (cookie.get(AuthConstant.ACCESS_TOKEN) !== undefined && cookie.get(AuthConstant.ACCESS_TOKEN) !== '') {
      setAuth(true)
    } else {
      navigate('/login')
    }
  }, [navigate]);

  return auth && props.children;
}
