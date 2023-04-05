import pandas as pd
import numpy as np
from sklearn.impute import KNNImputer
from matplotlib import pyplot as plt
from scipy.interpolate import make_interp_spline


df = pd.read_csv('./auto-mpg.csv')
df = df.replace('?',0)
knn = KNNImputer(missing_values=0, n_neighbors=5)
df.horsepower = knn.fit_transform(df.horsepower.values.reshape(-1,1))
mean_df = df.groupby('model year').mean().reset_index()

B_spline_coeff = make_interp_spline(mean_df['model year'].values, mean_df.horsepower.values)
X_Final = np.linspace(mean_df['model year'].values.min(), mean_df['model year'].values.max(), 500)
Y_horse = B_spline_coeff(X_Final)

B_spline_coeff = make_interp_spline(mean_df['model year'].values, mean_df.displacement.values)
Y_displacement = B_spline_coeff(X_Final)


plt.rcParams['figure.figsize'] = (7.5,4)
fig, ax = plt.subplots()
fig.set_facecolor('#eaf0f6')
ax.spines[['top','right']].set_visible(False)
ax.set_facecolor('#eaf0f6')
ax.grid(axis='y')
ax.plot(X_Final,Y_horse,color='#4285F4',label='Engine Displacement')
ax.plot(X_Final,Y_displacement,color='#ea4335',label='Horsepower')
ax.scatter(mean_df['model year'].values,mean_df.horsepower.values,color='#4285F4')
ax.scatter(mean_df['model year'].values,mean_df.displacement.values,color='#ea4335')
ax.set_yticks([100,200,300])
ax.set_xlabel('Model Year')
plt.legend(bbox_to_anchor =(0.75, 1.15), ncol = 2,frameon=False,)
plt.show()