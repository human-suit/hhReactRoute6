import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextInput, Button, Select } from '@mantine/core';
import { addSkill, removeSkill, setCity } from '@/features/modal/filtersSlice';
import { fetchVacancies } from '@/features/modal/modalSlice';
import { locateIcon } from '@shared/assets/';
import { useAppDispatch } from '@/hooks/useReduxHooks';
import type { RootState } from '@/app/store';

import { useSearchParams } from 'react-router-dom';

import style from './index.module.scss';

export default function SectionFilter() {
  const dispatch = useAppDispatch();
  const { city, skills, searchText } = useSelector(
    (state: RootState) => state.filters
  );
  const [skillInput, setSkillInput] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const updateUrlParams = (
    newCity = city,
    newSkills = skills,
    newText = searchText
  ) => {
    const params = new URLSearchParams();

    if (newCity) params.set('city', newCity);
    if (newText) params.set('q', newText.trim());
    newSkills.forEach((s) => params.append('skills', s));

    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    const hasAny =
      searchParams.get('city') ||
      searchParams.get('q') ||
      searchParams.getAll('skills').length;
    if (!hasAny) {
      updateUrlParams();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    const updatedSkills = [...skills, trimmed];
    dispatch(addSkill(trimmed));
    dispatch(
      fetchVacancies({ city, skills: updatedSkills, text: searchText.trim() })
    );
    updateUrlParams(city, updatedSkills);
    setSkillInput('');
  };

  const handleCityChange = (value: string | null) => {
    const newCity = value ?? '';
    dispatch(setCity(newCity));
    dispatch(
      fetchVacancies({ city: newCity, skills, text: searchText.trim() })
    );

    updateUrlParams(newCity, skills);
  };

  const handleRemoveSkill = (skill: string) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    dispatch(removeSkill(skill));
    dispatch(
      fetchVacancies({
        city,
        skills: skills.filter((s) => s !== skill),
        text: searchText.trim(),
      })
    );
    updateUrlParams(city, updatedSkills);
  };

  return (
    <div className={style.sectionFilter}>
      <div className={style.blockFilter}>
        <p>Ключевые навыки</p>

        <div className={style.inputRow}>
          <TextInput
            className={style.input}
            placeholder="Навык"
            value={skillInput}
            onChange={(e) => setSkillInput(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
          />
          <Button className={style.plusBtn} onClick={handleAddSkill}>
            +
          </Button>
        </div>

        <div className={style.grid}>
          {skills.map((skill) => (
            <span key={skill} className={style.skill}>
              <p>{skill}</p>
              <Button
                variant="subtle"
                size="xs"
                className={style.deleteBtn}
                onClick={() => handleRemoveSkill(skill)}
              >
                ✕
              </Button>
            </span>
          ))}
        </div>
      </div>

      <div className={style.filterCity}>
        <img src={locateIcon} alt="locate Icon" />
        <Select
          className={style.citySelect}
          value={city}
          onChange={handleCityChange}
          data={[
            { value: '', label: 'Выберите город' },
            { value: 'Москва', label: 'Москва' },
            { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
            { value: 'all', label: 'Все' },
          ]}
        />
      </div>
    </div>
  );
}
