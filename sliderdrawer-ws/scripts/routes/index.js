const Application = require("sf-core/application");
const OS = require('sf-core/device/system').OS;
const {
    NativeRouter: Router,
    NativeStackRouter: StackRouter,
    Route
} = require("@smartface/router");
const sliderDrawerWrapper = require("../sliderdrawer-comp");

var activePage = {};
const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            routes: [
                Route.of({
                    path: "/pages/page1",
                    routeDidEnter: (router, route) => {
                        activePage.router = router;
                        activePage.name = "page1";
                        sliderDrawerWrapper.enabled = true;
                        sliderDrawerWrapper.hide();
                    },
                    routeDidExit: (router, route) => {},
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let Page1 = require("pages/page1");
                        return new Page1(routeData, router, sliderDrawerWrapper);
                    }
                }),
                Route.of({
                    path: "/pages/page2",
                    routeDidEnter: (router, route) => {
                        activePage.router = router;
                        activePage.name = "page2";
                        sliderDrawerWrapper.enabled = true;
                        sliderDrawerWrapper.hide();
                    },
                    routeDidExit: (router, route) => {},
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let Page2 = require("pages/page2");
                        return new Page2(routeData, router, sliderDrawerWrapper);
                    }
                })
            ]
        })
    ]
});
if (OS === "Android") { // Android back button
    Application.android.onBackButtonPressed = () => {
        switch (activePage.name) {
            case 'page2':
                activePage.router.goBack();
                break;
            case 'page1':
                Application.exit();
                break;
        }
    };
}
sliderDrawerWrapper.setRouter(router);
module.exports = router;
