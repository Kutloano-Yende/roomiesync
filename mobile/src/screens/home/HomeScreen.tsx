/**
 * Home Dashboard — RoomieSync UI Prototype Screen 4 of 15.
 *
 * Main hub. Shows top AI match, stats, and recent activity. Data is
 * MOCKED (see src/services/dashboardService.ts) — no real matching
 * engine, expenses, or activity feed exists yet.
 */

import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

import { Avatar } from "../../components/Avatar";
import { Badge, BadgeTone } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { useAuth } from "../../context/AuthContext";
import * as dashboardService from "../../services/dashboardService";
import type { DashboardSummary } from "../../services/dashboardService";
import type { ActivityItem } from "../../types/activity";
import { colors, fontSize, spacing } from "../../theme";
import type { MainTabParamList } from "../../navigation/MainTabNavigator";
import type { RootStackParamList } from "../../navigation/AppNavigator";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;

const METATONE_TO_BADGE_TONE: Record<ActivityItem["metaTone"], BadgeTone> = {
  warning: "warning",
  neutral: "neutral",
  action: "action",
  success: "success",
};

function getGreetingWord(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getDashboardSummary();
      setSummary(data);
    } catch {
      setError("Couldn't load your dashboard. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function goToParentPlaceholder(title: string) {
    navigation
      .getParent<NativeStackNavigationProp<RootStackParamList>>()
      ?.navigate("Placeholder", { title });
  }

  function handleActivityPress(item: ActivityItem) {
    if (item.kind === "expense") {
      navigation.navigate("Expenses");
    } else if (item.kind === "matchRequest") {
      navigation.navigate("Matches");
    } else {
      goToParentPlaceholder("Feedback");
    }
  }

  const firstName = user?.fullName.split(" ")[0] ?? "there";
  const initials = user?.initials ?? "?";

  return (
    <SafeAreaView style={styles.container} testID="home-screen" edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isLoading && !!summary} onRefresh={load} />
        }
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Avatar initials={initials} size={40} />
            <Text style={styles.greeting}>
              {getGreetingWord(new Date().getHours())}, {firstName}
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <Pressable
              testID="home-notifications-button"
              accessibilityRole="button"
              accessibilityLabel="Notifications"
              onPress={() => goToParentPlaceholder("Notifications")}
              style={styles.iconButton}
            >
              <Text style={styles.iconText}>🔔</Text>
            </Pressable>
            <Pressable
              testID="home-settings-button"
              accessibilityRole="button"
              accessibilityLabel="Settings"
              onPress={() => goToParentPlaceholder("Settings")}
              style={styles.iconButton}
            >
              <Text style={styles.iconText}>⚙️</Text>
            </Pressable>
          </View>
        </View>

        {isLoading && !summary ? (
          <View style={styles.centerState} testID="home-loading-state">
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : error ? (
          <View style={styles.centerState} testID="home-error-state">
            <Text style={styles.errorText}>{error}</Text>
            <Button label="Retry" variant="outline" onPress={load} />
          </View>
        ) : summary ? (
          <>
            <View style={styles.statsRow}>
              <Card style={styles.statCard}>
                <Text style={styles.statLabel}>Your matches</Text>
                <Text style={styles.statValue}>{summary.matchesCount}</Text>
              </Card>
              <Card style={styles.statCard}>
                <Text style={styles.statLabel}>Avg compatibility</Text>
                <Text style={styles.statValue}>{summary.avgCompatibility}%</Text>
              </Card>
            </View>

            <Text style={styles.sectionLabel}>Top match today</Text>
            <Card style={styles.topMatchCard} testID="home-top-match-card">
              <View style={styles.topMatchRow}>
                <Avatar
                  initials={summary.topMatch.initials}
                  color={summary.topMatch.avatarColor}
                  size={48}
                />
                <View style={styles.topMatchInfo}>
                  <Text style={styles.topMatchName}>{summary.topMatch.fullName}</Text>
                  <Text style={styles.topMatchResidence}>
                    {summary.topMatch.residence}
                  </Text>
                </View>
                <Badge label={`${summary.topMatch.compatibilityScore}%`} tone="success" />
              </View>
              <Button
                testID="home-view-profile-button"
                label="View profile"
                onPress={() => goToParentPlaceholder("Match detail")}
                style={styles.viewProfileButton}
              />
            </Card>

            <Text style={styles.sectionLabel}>Recent activity</Text>
            {summary.recentActivity.length === 0 ? (
              <Text style={styles.emptyText} testID="home-activity-empty">
                No recent activity yet.
              </Text>
            ) : (
              summary.recentActivity.map((item) => (
                <Pressable
                  key={item.id}
                  testID={`home-activity-${item.id}`}
                  onPress={() => handleActivityPress(item)}
                  style={({ pressed }) => [
                    styles.activityRow,
                    pressed && styles.activityRowPressed,
                  ]}
                >
                  <View style={styles.activityText}>
                    <Text style={styles.activityTitle}>{item.title}</Text>
                    <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
                  </View>
                  <Badge label={item.meta} tone={METATONE_TO_BADGE_TONE[item.metaTone]} />
                </Pressable>
              ))
            )}
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  greeting: {
    fontSize: fontSize.md,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
  iconText: {
    fontSize: fontSize.lg,
  },
  centerState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },
  errorText: {
    color: colors.error,
    fontSize: fontSize.sm,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  sectionLabel: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  topMatchCard: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
    marginBottom: spacing.lg,
  },
  topMatchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  topMatchInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  topMatchName: {
    fontSize: fontSize.md,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  topMatchResidence: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  viewProfileButton: {
    backgroundColor: colors.primary,
  },
  emptyText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityRowPressed: {
    opacity: 0.6,
  },
  activityText: {
    flex: 1,
    marginRight: spacing.sm,
  },
  activityTitle: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  activitySubtitle: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
