import style from './styles/index.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks';
import { Vacancy } from '@/shared/types/vacancy';
import { useEffect } from 'react';
import { fetchVacancies } from '@/features/modal/modalSlice';
import { useNavigate } from 'react-router-dom';

import { Header, SectionFilter, SectionSertch } from '@widgets/index';

const DEFAULT_FILTERS = {
  city: '',
  skills: ['TypeScript', 'React', 'Redux'],
  text: '',
};

function App() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.vacancies);
  const navigate = useNavigate();

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchVacancies(DEFAULT_FILTERS));
    }
  }, [dispatch, list.length]);

  return (
    <div className={style.main}>
      <Header />
      <SectionSertch />
      <div className={style.flex}>
        <SectionFilter />
        <div className={style.SectionList}>
          {loading && <p>Загрузка...</p>}
          {error && <p>Ошибка: {error}</p>}
          <div>
            {list.map((vacancy: Vacancy) => (
              <ul key={vacancy.id}>
                <li>
                  {vacancy.name} в {vacancy.employer?.name}
                </li>
                <li>
                  {vacancy.salary
                    ? `${vacancy.salary.from ?? 'З/п не указана'} ${vacancy.salary.currency}`
                    : 'З/п не указана'}{' '}
                  {vacancy.experience.name}
                </li>
                <li>{vacancy.employer?.name}</li>

                {vacancy.work_format?.some(
                  (format) =>
                    format.name === 'Гибрид' || format.name === 'Можно удалённо'
                ) && <li className={style.work}>Можно удалённо</li>}

                <li>{vacancy.address?.city ?? 'Город не указан'}</li>

                <li>
                  <button onClick={() => navigate(`/vacancies/${vacancy.id}`)}>
                    Смотреть вакансию
                  </button>
                  <a
                    href={vacancy.alternate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button>Откликнуться</button>
                  </a>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
