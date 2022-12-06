// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Master Setup',
    type: 'group',
    children: [
        // {
        //     id: 'util-typography',
        //     title: 'Typography',
        //     type: 'item',
        //     url: '/utils/util-typography',
        //     icon: icons.IconTypography,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'util-color',
        //     title: 'Color',
        //     type: 'item',
        //     url: '/utils/util-color',
        //     icon: icons.IconPalette,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'util-shadow',
        //     title: 'Shadow',
        //     type: 'item',
        //     url: '/utils/util-shadow',
        //     icon: icons.IconShadow,
        //     breadcrumbs: false
        // },
        {
            id: 'icons',
            title: 'Pre Tour Master',
            type: 'collapse',
            icon: icons.IconWindmill,
            children: [
                {
                    id: 'tax-id',
                    title: 'Tax',
                    // icon: icons.IconTypography,
                    // type: 'collapse',
                    type: 'item',
                    url: '/master/taxview',
                    breadcrumbs: false
                },
                {
                    id: 'tax-group-id',
                    title: 'Tax Group',
                    type: 'item',
                    url: '/master/taxgroupview',
                    breadcrumbs: false
                },
                {
                    id: 'operators',
                    type: 'collapse',
                    title: 'Operators',
                    children: [
                        {
                            id: 'codename',
                            title: 'CodeAndName',
                            type: 'item',
                            url: '/utils/util-color',
                            breadcrumbs: false
                            // icon: "bi bi-journal-code",
                            // path: "/master/codeAndName",
                        },
                        {
                            id: 'manager',
                            title: 'Manager',
                            type: 'item',
                            url: '/utils/util-color',
                            breadcrumbs: false
                            // icon: "bi bi-journal-code",
                            // path: "/master/codeAndName",
                        },

                        {
                            id: 'market',
                            title: 'Market',
                            type: 'item',
                            url: '/utils/util-color',
                            breadcrumbs: false
                            // icon: "bi bi-journal-code",
                            // path: "/master/codeAndName",
                        }
                        //   {
                        //     title: "Manager",
                        //     icon: "bi bi-file-earmark-person",
                        //     path: "/master/manager",
                        //   },
                        //   {
                        //     title: "Market",
                        //     icon: "bi bi-shop-window",
                        //     path: "/master/market",
                        //   },
                        //   {
                        //     title: "Operator/Market Group",
                        //     icon: "bi bi-terminal-dash",
                        //     path: "/master/marketGroup",
                        //   },
                    ]
                },

                {
                    id: 'tour-category-id',
                    title: 'Tour Category',
                    type: 'item',
                    url: '/master/tourcategoryview',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;
