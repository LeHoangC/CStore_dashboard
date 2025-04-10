import Header from '../components/common/Header'
import Banner from '../components/settings/Banner'
import ConnectedAccounts from '../components/settings/ConnectedAccounts'
import DangerZone from '../components/settings/DangerZone'
import Notifications from '../components/settings/Notifications'
import Profile from '../components/settings/Profile'
import Security from '../components/settings/Security'

const SettingsPage = () => {
    return (
        <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
            <Header title="Settings" />
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <Banner />
                <Notifications />
                <Security />
                <ConnectedAccounts />
                <DangerZone />
            </main>
        </div>
    )
}
export default SettingsPage
