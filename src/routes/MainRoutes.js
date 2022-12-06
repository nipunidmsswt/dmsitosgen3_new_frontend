import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ViewTax from 'views/pages/master/tax/ViewTax';
import ViewTaxGroup from 'views/pages/master/tax_group/ViewTaxGroup';
import ViewTourCategory from 'views/pages/master/tour_category/ViewTourCategory';
import ViewTourType from 'views/pages/master/tour_type/ViewTourType';
import ViewCodeAndName from 'views/pages/master/code_name/ViewCodeAndName';
import ViewManager from 'views/pages/master/operator/manager/ViewManager';
import ViewMarket from 'views/pages/master/operator/market/ViewMarket';
import ViewMarketGroup from 'views/pages/master/operator/maketGroup/ViewMarketGroup';
import ViewOperatorEntry from 'views/pages/master/operator/operatorEntry/ViewOperatorEntry';
import ViewSeason from 'views/pages/master/season/ViewSeason';
import ViewHotelBasis from 'views/pages/master/hotelMaster/hotelBasis/ViewHotelBasis';
import ViewRoomCategory from 'views/pages/master/hotelMaster/roomCategory/ViewRoomCategory';
import ViewHotelCategory from 'views/pages/master/hotelMaster/hotel_category/ViewHotelCategory';
import ViewHotelFacility from 'views/pages/master/hotelMaster/hotel_facility/ViewHotelacility';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },

        // iTos3
        {
            path: 'master',
            children: [
                {
                    path: 'taxview',
                    element: <ViewTax />
                },
                {
                    path: 'taxgroupview',
                    element: <ViewTaxGroup />
                },
                {
                    path: 'tourtypeview',
                    element: <ViewTourType />
                },
                {
                    path: 'tourcategoryview',
                    element: <ViewTourCategory />
                },
                {
                    path: 'codeandnameview',
                    element: <ViewCodeAndName />
                },
                {
                    path: 'managerview',
                    element: <ViewManager />
                },
                {
                    path: 'marketview',
                    element: <ViewMarket />
                },
                {
                    path: 'marketgroupview',
                    element: <ViewMarketGroup />
                },
                {
                    path: 'operatorentryview',
                    element: <ViewOperatorEntry />
                },
                {
                    path: 'seasonview',
                    element: <ViewSeason />
                },
                {
                    path: 'hotelbasis',
                    element: <ViewHotelBasis />
                },
                {
                    path: 'roomcategory',
                    element: <ViewRoomCategory />
                },
                {
                    path: 'hotelcategoryview',
                    element: <ViewHotelCategory />
                },
                {
                    path: 'hotelFacilityview',
                    element: <ViewHotelFacility />
                }
            ]
        }
    ]
};

export default MainRoutes;
