import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyCollection from "../screens/MyCollection";
import MyHistory from "../screens/MyHistory";


const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Collection" component={MyCollection} />
            <Tab.Screen name="History" component={MyHistory} />
        </Tab.Navigator>
    );
}