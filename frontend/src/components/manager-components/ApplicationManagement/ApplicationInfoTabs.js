import React from 'react';

// styles
import classes from './ApplicationInfoTabs.module.css';

// material-ui components imports
import { Box, Grid, Tooltip, Fab } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';

// project components imports
import TabPanel from 'ui-component/tabs/TabPanel';
import { AntTabs, AntTab } from 'ui-component/tabs/CustomizedTabs';
import PersonalBriefInfo from 'components/student-components/PersonalInfo/PersonalBriefInfo';
import PersonalFullInfo from 'components/student-components/PersonalInfo/PersonalFullInfo';
import FileUploadedRecord from 'ui-component/info-record/FileUploadedRecord';

const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MeritTitle = (props) => (
    <h4 className={classes["merit-title"]}>
        {props.children}
    </h4>
);

const MeritSubTitle = (props) => (
    <h6 className={classes["merit-subtitle"]}>
        {props.children}
    </h6>
);

const MeritContent = (props) => (
    <p className={classes["merit-content"]}>
        {props.children}
    </p>
);

const MeritValue = ({ meritId, application}) => {
    const merit = application.merits.find(m => m.meritId === meritId);
    if (merit) {
        return (
        <div className={classes["merit-value"]}>
            {merit.content !== '' && <p>{merit.content}</p>}
            {merit.proofs.map(p =>                 
                <FileUploadedRecord 
                    file={p} 
                    allowDelete={false}
                />)
            }
        </div>)
    } else {
        return <></>
    }
}

// ========================|| APPLICATION DETAIL  ||======================== //
const MeritInfoTabs = (props) => {
    const { merits, role, application, student } = props;

    const ethnicCategories = 
        merits.find(merit => merit.name === 'ethnic').categories;

    const learningCategories = 
        merits.find(merit => merit.name === 'learning').categories;

    const healthCategories = 
        merits.find(merit => merit.name === 'health').categories;

    const volunteerCategories = 
        merits.find(merit => merit.name === 'volunteer').categories;

    const integrationCategories = 
        merits.find(merit => merit.name === 'integration').categories;

    const otherCategories = 
        merits.find(merit => merit.name === 'others').categories;

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <AntTabs
                    value={value} 
                    onChange={handleChange}  
                    variant="scrollable"
                    scrollButtons="auto" 
                >
                    <AntTab
                        icon={<AccountBoxOutlinedIcon />} 
                        iconPosition="start" 
                        label="Thông tin cá nhân" 
                        {...a11yProps(0)} 
                    />
                    <AntTab
                        icon={<FavoriteBorderOutlinedIcon />} 
                        iconPosition="start" 
                        label="Đạo đức tốt" 
                        {...a11yProps(1)} 
                    />
                    <AntTab 
                        icon={<SchoolOutlinedIcon />} 
                        iconPosition="start" 
                        label="Học tập tốt" 
                        {...a11yProps(2)} 
                    />
                    <AntTab 
                        icon={<AccessibilityNewOutlinedIcon />} 
                        iconPosition="start" 
                        label="Thể lực tốt" 
                        {...a11yProps(3)} 
                    />
                    <AntTab 
                        icon={<SpaOutlinedIcon />} 
                        iconPosition="start" 
                        label="Tình nguyện tốt" 
                        {...a11yProps(4)} 
                    />
                    <AntTab 
                        icon={<PublicOutlinedIcon />} 
                        iconPosition="start" 
                        label="Hội nhập tốt" 
                        {...a11yProps(5)} 
                    />
                    <AntTab 
                        icon={<DashboardCustomizeOutlinedIcon />} 
                        iconPosition="start" 
                        label="Tiêu chuẩn khác" 
                        {...a11yProps(6)} 
                    />
                </AntTabs>
            </Box>
            <TabPanel value={value} index={0}>
            <Grid 
                container 
                sx={{ display: 'flex', justifyContent: 'space-between'}} 
            >
                <Grid item md={3.4} xs={12} sm={12} sx={{ mt: '0'}} >
                    <PersonalBriefInfo user={student} />
                </Grid>
                <Grid item md={8.4} xs={12} sm={12} sx={{ mt: '0' }} >
                    <PersonalFullInfo user={student} />
                </Grid>
            </Grid>
        </TabPanel>
            <TabPanel value={value} index={1}>
                <Box margin={4}>
                    {ethnicCategories.map(category => 
                        <>
                            {category.title && 
                                <MeritTitle key={'title_' + category.id}>
                                    {category.title}
                                </MeritTitle>
                            }
                            {category.subTitle && 
                                <MeritSubTitle key={'subtitle_' + category.id}>
                                    {category.subTitle}
                                </MeritSubTitle>
                            }
                            <ol key={'list_' + category.id}>
                                {category.items.map(item => 
                                    <li key={item.id}>
                                        <MeritContent>
                                            {item.content}
                                        </MeritContent>
                                        <MeritValue 
                                            meritId={item.id} 
                                            application={application} 
                                        />
                                    </li>)
                                }
                            </ol>
                        </>
                    )}
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Box margin={4}>
                    {learningCategories.map(category => 
                        <>
                            {category.title && 
                                <MeritTitle key={'title_' + category.id}>
                                    {category.title}
                                </MeritTitle>
                            }
                            {category.subTitle && 
                                <MeritSubTitle key={'subtitle_' + category.id}>
                                    {category.subTitle}
                                </MeritSubTitle>}
                            <ol key={'list_' + category.id}>
                                {category.items.map(item => 
                                    <li key={item.id}>
                                        <MeritContent>
                                            {item.content}
                                        </MeritContent>
                                        <MeritValue 
                                            meritId={item.id} 
                                            application={application} 
                                        />
                                    </li>)
                                }
                            </ol>
                        </>
                    )}
                </Box>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Box margin={4}>
                    {healthCategories.map(category => 
                        <>
                            {category.title && 
                                <MeritTitle key={'title_' + category.id}>
                                    {category.title}
                                </MeritTitle>
                            }
                            {category.subTitle && 
                                <MeritSubTitle key={'subtitle_' + category.id}>
                                    {category.subTitle}
                                </MeritSubTitle>
                            }
                            <ol key={'list_' + category.id}>
                                {category.items.map(item => 
                                    <li key={item.id}>
                                        <MeritContent>
                                            {item.content}
                                        </MeritContent>
                                        <MeritValue 
                                            meritId={item.id} 
                                            application={application} 
                                        />
                                    </li>)
                                }
                            </ol>
                        </>
                    )}
                </Box>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Box margin={4}>
                    {volunteerCategories.map(category => 
                        <>
                            {category.title && 
                                <MeritTitle key={'title_' + category.id}>
                                    {category.title}
                                </MeritTitle>
                            }
                            {category.subTitle && 
                                <MeritSubTitle key={'subtitle_' + category.id}>
                                    {category.subTitle}
                                </MeritSubTitle>
                            }
                            <ol key={'list_' + category.id}>
                                {category.items.map(item => 
                                    <li key={item.id}>
                                        <MeritContent>
                                            {item.content}
                                        </MeritContent>
                                        <MeritValue 
                                            meritId={item.id} 
                                            application={application} 
                                        />
                                    </li>
                                )}
                            </ol>
                        </>
                    )}
                </Box>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Box margin={4}>
                    {integrationCategories.map(category => 
                        <>
                            {category.title && 
                                <MeritTitle key={'title_' + category.id}>
                                    {category.title}
                                </MeritTitle>
                            }
                            {category.subTitle && 
                                <MeritSubTitle key={'subtitle_' + category.id}>
                                    {category.subTitle}
                                </MeritSubTitle>
                            }
                            <ol key={'list_' + category.id}>
                                {category.items.map(item => 
                                    <li key={item.id}>
                                        <MeritContent>
                                            {item.content}
                                        </MeritContent>
                                        <MeritValue 
                                            meritId={item.id} 
                                            application={application} 
                                        />
                                    </li>
                                )}
                            </ol>
                        </>
                    )}
                </Box>
            </TabPanel>
            <TabPanel value={value} index={6}>
                <Box margin={4}>
                    {otherCategories.map(category => 
                        <>
                            {category.title && 
                                <MeritTitle key={'title_' + category.id}>
                                    {category.title}
                                </MeritTitle>
                            }
                            {category.subTitle && 
                                <MeritSubTitle key={'subtitle_' + category.id}>
                                    {category.subTitle}
                                </MeritSubTitle>}
                            <ol key={'list_' + category.id}>
                                {category.items.map(item => 
                                    <li key={item.id}>
                                        <MeritContent>
                                            {item.content}
                                        </MeritContent>
                                        <MeritValue 
                                            meritId={item.id} 
                                            application={application} 
                                        />
                                    </li>
                                )}
                            </ol>
                        </>
                    )}
                </Box>
            </TabPanel>
            {role === 'ADMIN' && <Tooltip title="Chỉnh sửa tiêu chí">
                <Fab
                    component="div"
                    onClick={() => {}}
                    size="medium"
                    variant="string"
                    color="primary"
                    sx={{
                        bottom: 16,
                        position: 'fixed',
                        right: 36,
                        zIndex: (theme) => theme.zIndex.speedDial,
                        boxShadow: theme.shadows[8]
                    }}
                >
                    <SettingsIcon />
                </Fab>
            </Tooltip>}
        </Box>
      );
};

export default MeritInfoTabs;