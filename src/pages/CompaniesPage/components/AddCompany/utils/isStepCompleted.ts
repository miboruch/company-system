import { PageSettingEnum } from '../context/PageContext';
import {CompanyDataInterface} from '../context/CompanyDataContext';

export const isStepCompleted = (data:CompanyDataInterface ,page: PageSettingEnum): boolean => {
  switch (page) {
    case PageSettingEnum.First:
      return !!(data.name && data.nip && data.email && data.phoneNumber);
    case PageSettingEnum.Second:
      return !!(data.lat && data.long);
    case PageSettingEnum.Third:
      return !!(data.address && data.city && data.country);
  }
};
