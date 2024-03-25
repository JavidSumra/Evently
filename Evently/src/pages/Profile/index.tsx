import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            {t("profile.myticket")}
          </h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link to="/">{t("profile.moreEventBtn")}</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={[]}
          emptyTitle={t("profile.noEventTicket")}
          emptyStateSubtext={t("profile.noEventSlogan")}
          collectionType="My_Tickets"
          limit={3}
          page={2}
          urlParamName="ordersPage"
          totalPages={3}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            {t("profile.headerEvent")}
          </h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link to="/events/create">{t("profile.crtEventBtn")}</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={[]}
          emptyTitle={t("profile.noEventTile")}
          emptyStateSubtext={t("profile.secondTitle")}
          collectionType="Events_Organized"
          limit={3}
          page={4}
          urlParamName="eventsPage"
          totalPages={3}
        />
      </section>
    </>
  );
};

export default ProfilePage;
