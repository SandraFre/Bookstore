import {MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";

export default () => {

    const {i18n} = useTranslation();

    const onChangeLanguage=(e)=>{
        i18n.changeLanguage(e.target.value);
    }

    return (
        <Select
            size="small"
            labelId="language-select-label"
            id="language-select"
            value={i18n.language}
            onChange={onChangeLanguage}
        >
            <MenuItem value="en" selected={i18n.language==='en'}>EN</MenuItem>
            <MenuItem value="lt" selected={i18n.language==='lt'}>LT</MenuItem>
        </Select>
    )
}