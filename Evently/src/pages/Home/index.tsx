import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
// import { SearchParamProps } from "@/types";
// import { Link } from "react-router-dom";
import HomeImage from "../../assets/images/hero.png";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchEvents } from "@/context/events/actions";
import { useEventsDispatch, useEventsState } from "@/context/events/context";

export default function Home() {
  const { t } = useTranslation();
  const eventsDispatch = useEventsDispatch();
  const state = useEventsState();

  const { Events } = state;

  useEffect(() => {
    (async () => {
      await fetchEvents(eventsDispatch);
    })();
  }, []);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">{t("headerTitle")}</h1>
            <p className="p-regular-20 md:p-regular-24">{t("slogan")}</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <a href="#events">{t("exploreButton")}</a>
            </Button>
          </div>

          <img
            src={HomeImage}
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          {t("home.eventHeader-2")} <br /> {t("home.eventHeader-1")}
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row" id="events">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={Events ?? []}
          emptyTitle={t("home.noEvent")}
          emptyStateSubtext={t("home.comeBack")}
          collectionType="All_Events"
          limit={6}
          page={2}
          totalPages={4}
        />
      </section>
    </>
  );
}
