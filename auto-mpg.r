library(readr)
library(ggplot2)

auto_mpg <- read_csv("auto-mpg.csv")

auto_mpg$horsepower <- replace(auto_mpg$horsepower,auto_mpg$horsepower=="?",0)

preProcValues <- preProcess(auto_mpg[,c('horsepower')],
                            method = c("knnImpute"),
                            k = 20,
                            knnSummary = mean)
impute_cars_info <- predict(preProcValues, auto_mpg)
impute_cars_info$horsepower <- strtoi(impute_cars_info$horsepower)

agg_df <- aggregate(impute_cars_info, by=list(impute_cars_info$`model year`), FUN=mean)
plot(agg_df$Group.1,agg_df$displacement, type = "o", col = "red")
points(agg_df$Group.1,agg_df$horsepower,type="o", col="blue")



ggplot(agg_df, aes(x=Group.1)) + 
  geom_line(aes(y = displacement), color = "#ea4335") + 
  geom_line(aes(y = horsepower), color="#4285F4") +
  geom_point(aes(y = displacement), color = "#ea4335")+
  geom_point(aes(y = horsepower), color = "#4285F4")+
  labs(x = "Model Year", y="") +
  theme(legend.position = "top") +
  coord_cartesian(ylim = c(0, 300)) +
  theme_classic()+
  scale_x_discrete(limits = c(70, 72, 74,76, 78, 80, 82))


                  
                  