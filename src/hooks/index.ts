import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';

import { usePagination } from './usePagination';
import { useQueryString } from './useQueryString';

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export { usePagination, useAppDispatch, useAppSelector, useQueryString };
